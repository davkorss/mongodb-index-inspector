# MongoDB Index Inspector

Log warnings about the missing MongoDB indexes.

## Support

MongoDB Node.JS Driver 2.2

MongoDB 3.4

## Installation

```sh
npm install mongodb-index-inspector --save
npm install mongodb@2.2 --save
```

## Usage

### TypeScript

```typescript
import { MongoDBIndexInspector, MongoDBFilter } from 'mongodb-index-inspector';

async function inspect (): void {
    const filter: MongoDBFilter = { username: 'davkorss', password: 'The safest password in the world :3' };
    const inspector: MongoDBIndexInspector = new MongoDBIndexInspector(collection);
    await inspector.inspect(filter);
}

inspect();
```
```sh
If the index does not exist, output should be:
'Missing index from filter {"username":"davkorss","password":"The safest password in the world :3"}'
```

### JavaScript

```javascript
const MongoDBIndexInspector = require('mongodb-index-inspector').MongoDBIndexInspector

async function inspect () {
    const filter = { username: 'davkorss', password: 'The safest password in the world :3' }
    const inspector = new MongoDBIndexInspector(collection)
    await inspector.inspect(filter)
}

inspect()
```
```sh
If the index does not exist, output should be:
'Missing index from filter {"username":"davkorss","password":"The safest password in the world :3"}'
```

## Test 
```sh
npm test
```
