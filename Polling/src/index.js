const { EventEmitter } = require('events');
const http = require('http');
const express = require('express');

const READY = 'READY',
	NOT_READY = 'NOT_READY',
	TIMED_OUT = 'TIMED_OUT',
	REPLIED = "REPLIED";

/**
 * @typedef {Object} PollerOpts
 * @property {Number} keepAlive milliseconds for how long to keep request alive
 */

class GameClient extends EventEmitter {
	constructor(opts = {}) {
		this.gameId = opts.gameId || '';
		self.update(opts, false);
	}
	setReadyState(state = READY) {
		this.readyState = READY;
		this.emit('stateChange', this.readyState);
	}
	reply(message, data = {}, event = REPLIED) {
		if (this.timeout) {
			clearTimeout(this.timeout);
		}
		setReadyState(event);
		if (this.res) {
			this.res.send({
				message,
				data
			});
		}
	}
	update(opts = {}, event = true) {
		this.req = opts.req;
		this.res = opts.res;
		if (this.timeout) {
			clearTimeout(this.timeout);
		}
		this.readyState = opts.readyState || NOT_READY;
		if (event) this.emit('update', opts);
	}
}

/**
 * @class Poll server
 */
class Poller {
	/**
	 * @param  {Object} opts Poller options
	 */
	constructor(opts = {}) {
		this.opts = Object.assign({}, {
			keepAlive: 5 * 60 * 1000
		}, opts);
		this.clients = new Set();
	}
	middleware() {
		return new express.Router()
			.get('/poll', (req, res) => {
				// sets keep alive
				req.socket.setTimeout(this.opts.keepAlive);

				const gameId = req.query.game;

				if (gameId) {
					const oldClient = this.getClient(gameId);
					if (oldClient && oldClient.readyState == READY) {
						return res.status(403).send({
							message: 'one_request_only',
							data: {}
						});
					}
				}

				this.createClient({
					req,
					res,
					gameId: req.query.game,
					timeout: setTimeout(() => {
						if (client.readyState == READY) {
							client.reply('empty', {}, TIMED_OUT);
						}
					}, this.opts.keepAlive),
					readyState: READY
				});
			});
	}
	createClient(opts = {}) {
		let client = this.getClient(opts.gameId);
		if (client) {
			client.update(opts);
		} else {
			client = new GameClient(opts);
			clients.add(client);
		}
		return client;
	}
	getClient(id) {
		return [...clients].find(client => client.gameId == id);
	}
	broadcast() {

	}
}

module.exports = Poller;