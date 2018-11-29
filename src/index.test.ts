import { MongoDBIndexInspector } from './index';
import { MongoDBFilter, MongoDBCollectionIndex } from './interfaces/IMongoDBIndexInspector';
import { Collection } from 'mongodb';

describe('Inspector', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('create inspector instance', () => {
        const MockIndexes = jest.fn<MongoDBCollectionIndex[]>(() => ([
            { v: 2, unique: true, key: { username: 1 }, name: 'username', ns: 'database.clients', background: true },
            { v: 2, key: { 'vehicle.id': -1, 'data.longitude': 1 }, name: 'vehicle.id_-1_data.longitude_1', ns: 'database.events', background: true }
        ]));
        const MockCollection = jest.fn<Collection>(() => ({
            indexes: MockIndexes
        }));
        const collection = new MockCollection();
        const filter: MongoDBFilter = { 'vehicle.id': '59d694e13a07480bf69da74d', 'data.longitude': -75.234567 };
        const inspector: MongoDBIndexInspector<MongoDBFilter> = new MongoDBIndexInspector<MongoDBFilter>(collection, filter);
        expect(inspector).toBeInstanceOf(MongoDBIndexInspector);
        expect(inspector.collection).toEqual(collection);
        expect(inspector.filter).toEqual(filter);
    });
    it('inspect write to stdout', async () => {
        const MockIndexes = jest.fn<MongoDBCollectionIndex[]>(() => ([
            { v: 2, unique: true, key: { username: 1 }, name: 'username', ns: 'database.clients', background: true },
            { v: 2, key: { 'vehicle.id': -1, 'data.longitude': 1 }, name: 'vehicle.id_-1_data.longitude_1', ns: 'database.events', background: true }
        ]));
        const MockCollection = jest.fn<Collection>(() => ({
            indexes: MockIndexes
        }));
        const collection = new MockCollection();
        const filter: MongoDBFilter = { 'vehicle.id': '59d694e13a07480bf69da74d' };
        const inspector: MongoDBIndexInspector<MongoDBFilter> = new MongoDBIndexInspector<MongoDBFilter>(collection, filter);
        const spy = jest.spyOn(process.stdout, 'write');
        await inspector.inspect();
        expect(spy.mock.calls).toEqual([[`Missing index from filter ${JSON.stringify(filter)}\n`]]);
    });
    it('inspect without write to stdout', async () => {
        const MockIndexes = jest.fn<MongoDBCollectionIndex[]>(() => ([
            { v: 2, unique: true, key: { username: 1 }, name: 'username', ns: 'database.clients', background: true },
            { v: 2, key: { 'vehicle.id': -1, 'data.longitude': 1 }, name: 'vehicle.id_-1_data.longitude_1', ns: 'database.events', background: true }
        ]));
        const MockCollection = jest.fn<Collection>(() => ({
            indexes: MockIndexes
        }));
        const collection = new MockCollection();
        const filter: MongoDBFilter = { 'vehicle.id': '59d694e13a07480bf69da74d', 'data.longitude': -75.234567 };
        const inspector: MongoDBIndexInspector<MongoDBFilter> = new MongoDBIndexInspector<MongoDBFilter>(collection, filter);
        const spy = jest.spyOn(process.stdout, 'write');
        await inspector.inspect();
        expect(spy.mock.calls).toEqual([]);
    });
});
