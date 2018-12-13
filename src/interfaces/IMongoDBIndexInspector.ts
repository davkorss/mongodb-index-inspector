import { Collection } from 'mongodb';

export type MongoDBFilter = object;

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

export interface IMongoDBIndexInspector {
    readonly collection: Collection;
    inspect(filter: MongoDBFilter): void;
}
