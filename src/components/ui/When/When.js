const When = ({condition, children}) => {
    if (!condition) return null;

    return children;
};

export default When;