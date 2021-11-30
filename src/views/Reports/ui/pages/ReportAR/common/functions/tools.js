export function compareByGroupName( a, b ) {
    if ( a.group_name < b.group_name ){
        return -1;
    }
    if ( a.group_name > b.group_name ){
        return 1;
    }
    return 0;
}