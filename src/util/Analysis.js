"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalysisFilter = exports.AnalysisEffect = void 0;
function AnalysisEffect(effect, mapper) {
    const str = effect.toString();
    const left = str.indexOf('(');
    const right = str.indexOf(')');
    const names = str
        .substring(left + 1, right)
        .replace(/\s/g, '')
        .split(',');
    return (item) => {
        const args = names.map((name) => item[mapper ? mapper[name] : name]);
        return effect(...args);
    };
}
exports.AnalysisEffect = AnalysisEffect;
function AnalysisFilter(filter, mapper) {
    const str = filter.toString();
    const left = str.indexOf('(');
    const right = str.indexOf(')');
    const names = str
        .substring(left + 1, right)
        .replace(/\s/g, '')
        .split(',');
    return (item, index, items) => {
        const args = names.map((name) => item[mapper ? mapper[name] : name]);
        return filter(...args);
    };
}
exports.AnalysisFilter = AnalysisFilter;
