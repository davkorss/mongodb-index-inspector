import { IMongoDBIndexInspector, MongoDBCollectionIndex } from './interfaces/IMongoDBIndexInspector';
import { Collection } from 'mongodb';

export class MongoDBIndexInspector<Filter> implements IMongoDBIndexInspector<Filter> {
    public readonly collection: Collection;
    public readonly filter: Filter;
    constructor(collection: Collection, filter: Filter) {
        this.collection = collection;
        this.filter = filter;
    }
    public async inspect(): Promise<void> {
        const collectionIndexes: MongoDBCollectionIndex[] = await this.collection.indexes();
        const foundIndex: MongoDBCollectionIndex | undefined = findIndexThatMatchFilter(collectionIndexes, this.filter);
        if (!foundIndex) {
            process.stdout.write(`Missing index from filter ${JSON.stringify(this.filter)}\n`);
        }
    }
}

function findIndexThatMatchFilter<Filter>(collectionIndexes: MongoDBCollectionIndex[], filter: Filter): MongoDBCollectionIndex | undefined {
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
