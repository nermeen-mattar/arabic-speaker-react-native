const IllustrationScreen = require("./IllustrationScreen")
// @ponicode
describe("componentDidMount", () => {
    let inst

    beforeEach(() => {
        inst = new IllustrationScreen.default()
    })

    test("0", () => {
        let callFunction = () => {
            inst.componentDidMount()
        }
    
        expect(callFunction).not.toThrow()
    })
})
