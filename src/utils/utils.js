export const ConditionalWrapper = ({condition, wrapperSuccess, children, wrapperNotSuccess}) => {
    return condition ? wrapperSuccess(children) :
        wrapperNotSuccess ? wrapperNotSuccess(children)
            : children;
}
