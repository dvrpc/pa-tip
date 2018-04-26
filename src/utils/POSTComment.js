export const POSTComment = (instance, e) => {
  e.preventDefault();
  const comment = e.target[0].value;
  const name = e.target[1].value;
  const email = e.target[2].value;
  const county = e.target[3].value;
  const projectID = instance.props.details ? instance.props.details.id : "test";
  instance.props.submitComment({ comment, name, email, county, projectID });
};
