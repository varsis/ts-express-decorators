import {CookiesFilter} from "../../../../src/filters/components/CookiesFilter";
import {Cookies} from "../../../../src/filters/decorators/cookies";
import {ParamRegistry} from "../../../../src/filters/registries/ParamRegistry";
import {Sinon} from "../../../tools";

class Test {

}

describe("Cookies", () => {

    before(() => {
        this.decorateStub = Sinon.stub(ParamRegistry, "decorate");
        Cookies("test", Test);
    });

    after(() => {
        this.decorateStub.restore();
    });

    it("should have been called ParamFilter.decorate method with the correct parameters", () =>
        this.decorateStub.should.have.been.calledOnce
            .and
            .calledWithExactly(CookiesFilter, {
                expression: "test",
                useType: Test
            })
    );
});