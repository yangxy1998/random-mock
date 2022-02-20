"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetRuleOrder = void 0;
function GetRuleOrder(attributes, rules) {
    let leading = [];
    let following = [];
    let order = [];
    function updateState() {
        following = [];
        for (let rule of rules) {
            if (!following.includes(rule.dependent))
                following.push(rule.dependent);
        }
        for (let attribute of attributes) {
            if (!following.includes(attribute.name) && !leading.includes(attribute.name)) {
                order.push(attribute);
                leading.push(attribute.name);
            }
        }
    }
    updateState();
    let i = 0;
    while (rules.length > 0) {
        let rule = rules[i];
        let clear = true;
        rule.arguments.forEach((argument) => {
            if (!leading.includes(argument)) {
                clear = false;
            }
        });
        if (!clear) {
            i++;
        }
        else {
            order.push(rule);
            rules.splice(i, 1);
        }
        if (i >= rules.length) {
            updateState();
            i = 0;
        }
    }
    return order;
}
exports.GetRuleOrder = GetRuleOrder;
