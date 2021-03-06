# Testing

## Unit test
### Installation

All following examples are based on `mocha + chai` testing framework. Obviously, you can use another framework like Jasmine !
To install mocha and chai just run these commands:
```
npm install --save-dev mocha chai
```

You can use `mocha` and `chai` with TypeScript.

```typescript
npm install --save-dev @types/mocha @types/chai
```

And add `mocha` and `chai` types in your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "module": "commonjs",
    "target": "es5",
    "noImplicitAny": false,
    "sourceMap": true,
    "declaration":false,
    "experimentalDecorators":true,
    "emitDecoratorMetadata": true,
    "moduleResolution": "node",
    "isolatedModules": false,
    "suppressImplicitAnyIndexErrors": false,
    "lib": ["es6", "dom"],
    "types":[
      "node",
      "chai",
      "mocha",
      "express",
      "reflect-metadata"
    ]
  },

  "exclude": [
    "node_modules"
  ]
}
```

### Testing services

Ts.ED are bundled with a testing module `ts-express-decorators/testing`. This module provide a function `inject()` to inject your services collected via annotation `@Service()`.

Example of unit test for the `ParseService`:

```typescript
import {expect} from "chai";
import {inject} from "ts-express-decorators/testing";
import {ParseService} from "ts-express-decorators";

describe('ParseService', () => {

    it('should clone object', () => {

        const source = {};

        expect(ParseService.clone(source)).not.to.be.equal(source);

    });

    it('should evaluate expression with a scope and return value', inject([ParseService], (parserService: ParseService) => {

        expect(parserService.eval("test", {
            test: "yes"
        })).to.equal("yes");

    }));
});
```

Testing asynchronous method is also possible with `Done` function:

```typescript
import {expect} from "chai";
import {inject} from "ts-express-decorators/testing";
import {DbService} from "../services/db";

describe('DbService :', () => {

    it('should data from db', inject([DbService, Done], (dbService: dbService, done: Done) => {
        
        dbService
           .getData()
           .then((data) => {
               expect(data).to.be.an('object');
               done();
           });

    }));
});
```

### Testing controllers
#### basic usage

Use `ControllerService` to invoke your controller and test it:
```typescript
import {expect} from "chai";
import {inject} from "ts-express-decorators/testing";
import {MyCtrl} from "../controllers/MyCtrl";

describe('MyCtrl', () => {
    // bootstrap your Server to load all endpoints before run your test
    beforeEach(bootstrap(Server));

    it('should do something', inject([ControllerService], (controllerService: ControllerService) => {
        const instance: MyCtrl = controllerService.invoke<MyCtrl>(MyCtrl);
        expect(!!instance).to.be.true;
    }));
});
```

#### Mock dependencies

```typescript
// in MyCtrl.ts
import {Get, Controller} from "ts-express-decorators/testing";
import {DbService} from "../services/DbService";
import {OtherService} from "../services/OtherService";

@Controller('/')
export class MyCtrl {
   constructor(private dbService: DbService, private otherService: OtherService) {
       
   }

   @Get('/')
   public getData() {
      return this.dbService.getList();
   }
}

// in MyCtrl.spec.ts
import {expect} from "chai";
import {inject} from "ts-express-decorators/testing";
import {MyCtrl} from "../controllers/MyCtrl";
import {DbService} from "../services/DbService";

describe('MyCtrl', () => {

    // bootstrap your Server to load all endpoints before run your test
    beforeEach(bootstrap(Server));

    it('should do something', inject([ControllerService], (controllerService: ControllerService) => {
        
        // create locals map
        const locals = new Map<any, any>();
        
        // replace DbService by a faker
        locals.set(DbService, {
            getList: () => {
               return "test";
            }
        })

        // give the locals map to the invoke method
        const instance: MyCtrl = controllerService.invoke<MyCtrl>(MyCtrl, locals);

        // and test it
        expect(!!instance).to.be.true;
        expect(instance.getData()).to.equals("test");
    }));
});
```

### Testing converters

`Converters` lets you customize how [ConverterService](converters.md) will deserialize a data for one or more types. This example show you the unit test for the Array type. 

The converter implementation in Ts.ED for Array type is the following:
```typescript
@Converter(Array)
export class ArrayConverter implements IConverter {

    constructor(private converterService: ConverterService) {}

    deserialize<T>(data: any, target: any, baseType?: T): T[] {

        if (isArrayOrArrayClass(data)) {
            return (data as Array<any>).map(item =>
                this.converterService.deserialize(item, baseType)
            );
        }

        return [data];
    }

    serialize(data: any[]) {
        return (data as Array<any>).map(item =>
            this.converterService.serialize(item)
        );
    }
}

```
And the unit test:
```typescript
import {expect} from "chai";
import {inject} from "ts-express-decorators/testing";
import {ConverterService} from "ts-express-decorators/src";

describe("ArrayConverter", () => {
    it('should convert data', inject([ConverterService], (converterService: ConverterService) => {

        const arrayConverter = converterService.getConverter(Array);

        expect(!!arrayConverter).to.be.true;

        expect(arrayConverter.deserialize(1)).to.be.an('array');
        expect(arrayConverter.deserialize([1])).to.be.an('array');
    }));
});
```

### Testing middlewares

`@Middleware()` is similar to the Express middleware with the difference that it is a class and you can use the IoC to inject other services on his constructor.

```typescript
import {inject} from 'ts-express-decorators/testing';
import {AcceptMimeMiddleware} from "ts-express-decorators";

describe('AcceptMimesMiddleware :', () => {
    it('should accept mime', inject([MiddlewareService], (middlewareService: MiddlewareService) => {

        const middleware = middlewareService.invoke<AcceptMimeMiddleware>(AcceptMimeMiddleware);
        const request = new FakeRequest();

        request.mime = "application/json";

        middleware.use({
            getMetadata: () => {
                return ['application/json']
            }
        } as any, request as any);

    }));
});
```

## Test your Rest API
### Installation

To test your API, I recommend you to use the [`supertest`](https://github.com/visionmedia/supertest) module.

To install supertest just run these commands:
```
npm install --save-dev supertest
```

You can use `supertest` with TypeScript.

```typescript
npm install --save-dev @types/supertest
```

And add `mocha` and `chai` types in your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "module": "commonjs",
    "target": "es5",
    "noImplicitAny": false,
    "sourceMap": true,
    "declaration":false,
    "experimentalDecorators":true,
    "emitDecoratorMetadata": true,
    "moduleResolution": "node",
    "isolatedModules": false,
    "suppressImplicitAnyIndexErrors": false,
    "lib": ["es6", "dom"],
    "types":[
      "node",
      "chai",
      "mocha",
      "express",
      "reflect-metadata",
      "supertest"
    ]
  },

  "exclude": [
    "node_modules"
  ]
}
```

### Example

```typescript
import {ExpressApplication} from "ts-express-decorators";
import {Done, bootstrap, inject} from "ts-express-decorators/testing";
import * as SuperTest from "supertest";
import {expect} from "chai";
import {Server} from "../Server";

describe("Rest", () => {
    // bootstrap your Server to load all endpoints before run your test
    beforeEach(bootstrap(Server));

    describe("GET /rest/calendars", () => {
        it("should do something", inject([ExpressApplication, Done], (expressApplication: ExpressApplication, done: Done) => {
            SuperTest(expressApplication)
                .get("/rest/calendars")
                .expect(200)
                .end((err, response: any) => {
                    if (err) {
                        throw (err);
                    }

                    const obj = JSON.parse(response.text);

                    expect(obj).to.be.an('array');

                    done();
                });
        }));
    });
});
```

### Disable Logs

If you like to disable log output for any reason, you can do it by calling `$log.level` or `$log.stop()`.
It is useful to suppress logging during unit tests runs so that your passed/failed test summary does not get polluted with information.

```typescript
import { $log } from "ts-log-debug";

describe('A test that will not print logs :', () => {

    before(() => {
        $log.level = "OFF"
    });

    /* you tests here */
});
```

<div class="guide-links">
<a href="#/docs/server-loader/lifecycle-hooks">ServerLoader</a>
<a href="#/tutorials/overview">Tutorials</a>
</div>
