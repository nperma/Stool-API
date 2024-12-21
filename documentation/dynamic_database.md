# DynamicDatabase Documentation

## Overview
The `DynamicDatabase` class provides a simple interface for storing and managing key-value pairs dynamically in a Minecraft world. It supports basic operations like `set`, `get`, `delete`, as well as additional functionality like iterating over entries, filtering, and mapping.

### Importing
```javascript
import { DynamicDatabase } from "./tools/database";

//context: Database
```

## Usage

### Creating a Database
To create a new database, you need to provide a unique identifier for it:
```javascript
const db = new DynamicDatabase("exampleDB");
```

## Methods

### `set(key: string, value: any): this`
Sets a value for a given key in the database.

#### Example
```javascript
db.set("username", "player1").set("score", 100);
```

### `get(key: string): any`
Gets the value associated with a given key. If the key does not exist, it returns `undefined`.

#### Example
```javascript
const username = db.get("username"); // "player1"
const score = db.get("score"); // 100
```

### `has(key: string): boolean`
Checks if the database contains a specific key.

#### Example
```javascript
if (db.has("username")) {
    console.log("Username exists in the database.");
}
```

### `delete(key: string): boolean`
Deletes a key and its associated value from the database. Returns `true` if the key was deleted, otherwise `false`.

#### Example
```javascript
db.delete("username"); // Deletes the key "username"
```

### `clear(): void`
Clears all entries in the database.

#### Example
```javascript
db.clear();
```

### `size: number`
Gets the number of entries in the database.

#### Example
```javascript
console.log(`The database has ${db.size} entries.`);
```

### `keys(): string[]`
Retrieves all the keys in the database.

#### Example
```javascript
const keys = db.keys(); // ["score"]
```

### `values(): any[]`
Retrieves all the values in the database.

#### Example
```javascript
const values = db.values(); // [100]
```

### `entries(): [string, any][]`
Retrieves all the key-value pairs in the database.

#### Example
```javascript
const entries = db.entries(); // [["score", 100]]
```

### `forEach(callback: (value: any, key: string, db: this) => void): void`
Iterates over each key-value pair in the database and executes a callback function.

#### Example
```javascript
db.forEach((value, key) => {
    console.log(`${key}: ${value}`);
});
```

### `map(callback: (value: any, key: string, db: this) => any): any[]`
Creates a new array populated with the results of calling a provided function on every entry.

#### Example
```javascript
const descriptions = db.map((value, key) => `${key} is set to ${value}`);
console.log(descriptions); // ["score is set to 100"]
```

### `filter(callback: (value: any, key: string, db: this) => boolean): any[]`
Creates a new array with all entries that pass the test implemented by the provided function.

#### Example
```javascript
const highScores = db.filter((value, key) => key === "score" && value > 50);
console.log(highScores); // [100]
```

### `reduce(callback: (accumulator: any, value: any, key: string, db: this) => any, initialValue: any): any`
Executes a reducer function on each entry of the database, resulting in a single output value.

#### Example
```javascript
const totalScore = db.reduce((acc, value) => acc + value, 0);
console.log(`Total Score: ${totalScore}`); // Total Score: 100
```

## Static Methods

### `DynamicDatabase.hasIdentifier(id: string): boolean`
Checks if a specific database identifier exists.

#### Example
```javascript
if (DynamicDatabase.hasIdentifier("exampleDB")) {
    console.log("Database 'exampleDB' exists.");
}
```

### `DynamicDatabase.getAllIdentifier(): string[]`
Retrieves all unique database identifiers.

#### Example
```javascript
const identifiers = DynamicDatabase.getAllIdentifier();
console.log(identifiers); // ["exampleDB"]
```

### `DynamicDatabase.clearAll(): void`
Clears all dynamic properties in the world.

#### Example
```javascript
DynamicDatabase.clearAll();
```

## License
This project is licensed under the MIT License.

Feel free to contribute by opening a pull request or reporting any issues!

