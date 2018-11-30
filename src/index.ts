import { IMongoDBIndexInspector, MongoDBCollectionIndex, MongoDBFilter } from './interfaces/IMongoDBIndexInspector';
import { Collection } from 'mongodb';

export * from './interfaces/IMongoDBIndexInspector';

export class MongoDBIndexInspector implements IMongoDBIndexInspector {
    public readonly collection: Collection;
    constructor(collection: Collection) {
        this.collection = collection;
    }
    public async inspect(filter: MongoDBFilter): Promise<void> {
        const collectionIndexes: MongoDBCollectionIndex[] = await this.collection.indexes();
        const foundIndex: MongoDBCollectionIndex | undefined = findIndexThatMatchFilter(collectionIndexes, filter);
        if (!foundIndex) {
            process.stdout.write(`Missing index from filter ${JSON.stringify(filter)}\n`);
        }
    }
}

function findIndexThatMatchFilter(collectionIndexes: MongoDBCollectionIndex[], filter: MongoDBFilter): MongoDBCollectionIndex | undefined {
    const foundIndex: MongoDBCollectionIndex | undefined = collectionIndexes.find((index: MongoDBCollectionIndex) => {
        const indexKey = index.key;
        for (const indexKeyProperty of Object.keys(indexKey)) {
            if (filter[indexKeyProperty] === undefined) {
                return false;
            }
        }
        return true;
    });
    return foundIndex;
}
