/**
 * refactor
 */

import type { CacheAdapter } from '../scheme/adapters/cache-adapter';
import type { DiscordUser } from '@biscuitland/api-types';

import { BaseResource } from './base-resource';

/**
 * Resource represented by an user of discord
 */

export class UserResource extends BaseResource<DiscordUser> {
	#namespace = 'user' as const;

	#adapter: CacheAdapter;

	constructor(adapter: CacheAdapter, entity?: DiscordUser | null) {
		super('user', adapter);

		this.#adapter = adapter;

		if (entity) {
			this.setEntity(entity);
		}
	}

	/**
	 * @inheritDoc
	 */

	async get(id: string): Promise<UserResource | null> {
		if (this.parent) {
			return this;
		}

		const kv = await this.#adapter.get(this.hashId(id));

		if (kv) {
			return new UserResource(this.#adapter, kv);
		}

		return null;
	}

	/**
	 * @inheritDoc
	 */

	async set(id: string, data: any): Promise<void> {
		if (this.parent) {
			this.setEntity(data);
		}

		await this.addToRelationship(id);
		await this.#adapter.set(this.hashId(id), data);
	}

	/**
	 * @inheritDoc
	 */

	async items(): Promise<UserResource[]> {
		const data = await this.#adapter.items(this.#namespace);

		if (data) {
			return data.map(dt => new UserResource(this.#adapter, dt));
		}

		return [];
	}

	/**
	 * @inheritDoc
	 */

	async count(): Promise<number> {
		return await this.#adapter.count(this.#namespace);
	}

	/**
	 * @inheritDoc
	 */

	async remove(id: string): Promise<void> {
		await this.removeToRelationship(id);
		await this.#adapter.remove(this.hashId(id));
	}

	/**
	 * @inheritDoc
	 */

	async contains(id: string): Promise<boolean> {
		return await this.#adapter.contains(this.#namespace, id);
	}

	/**
	 * @inheritDoc
	 */

	async getToRelationship(): Promise<string[]> {
		return await this.#adapter.getToRelationship(this.#namespace);
	}

	/**
	 * @inheritDoc
	 */

	async addToRelationship(id: string): Promise<void> {
		await this.#adapter.addToRelationship(this.#namespace, id);
	}

	/**
	 * @inheritDoc
	 */

	async removeToRelationship(id: string): Promise<void> {
		await this.#adapter.removeToRelationship(this.#namespace, id);
	}
}
