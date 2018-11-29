# MongoDB Index Inspector

Log warnings about the missing MongoDB indexes.

## Support

MongoDB Node.JS Driver 2.2

MongoDB 3.4

## Installation

`npm install mongodb-index-inspector`
```sh
npm install mongodb-index-inspector --save
npm install mongodb@2.2 --save
```

## Usage

### TypeScript

```typescript
import { MongoDBIndexInspector, MongoDBFilter } from 'mongodb-index-inspector';

const filter: MongoDBFilter = { username: 'davkorss', password: 'The safest password in the world :3' };
const inspector: MongoDBIndexInspector = new MongoDBIndexInspector(collection, filter);
inspector.inspect();
```

### JavaScript

```javascript
const MongoDBIndexInspector = require('mongodb-index-inspector').MongoDBIndexInspector

const filter = { username: 'davkorss', password: 'The safest password in the world :3' }
const inspector = new MongoDBIndexInspector(collection, filter)
inspector.inspect()
```
