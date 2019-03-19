const Conditional = (props: { if: boolean; children: any }) => {
  return !!props.if && props.children;
};
export default Conditional;
