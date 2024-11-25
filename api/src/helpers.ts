export const pick = <Obj, Keys extends keyof Obj>(obj: Obj, keys: Keys[]) => {
    return keys.reduce((pickedObj, val) => {
        pickedObj[val] = obj[val];
        return pickedObj;
    }, {} as Pick<Obj, Keys>);
}