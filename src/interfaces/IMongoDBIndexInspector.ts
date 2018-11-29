import { Collection } from 'mongodb';

export type MongoDBFilter = Object;

interface MongoDBCollectionIndexKey {
    [propName: string]: string | number;
}

export interface MongoDBCollectionIndex {
    v: number;
    unique?: boolean;
    key: MongoDBCollectionIndexKey;
    name: string;
    ns: string;
    background?: boolean;
}

export interface IMongoDBIndexInspector<Filter> {
    readonly collection: Collection;
    readonly filter: Filter;
    inspect(collection: Collection, filter: Filter): void;
}
