const SkeletonWrapper = ({ children, type }) => (
  <div className={`skeleton__wrp skeleton ${type}`}>
    {children}
  </div>
);

export default SkeletonWrapper