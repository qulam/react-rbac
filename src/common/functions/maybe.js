import {isJson} from "src/common/functions/tools";

export const Maybe = {
    isNoneOrEmptyString: dt => dt || '',
    isNoneOrEmptyList: dt => dt || [],
    isJsonOrNone: dt => isJson(dt) ? dt : null,
    isNoneOrHyphens: dt => dt || '---'
};