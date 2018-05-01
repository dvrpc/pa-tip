export const POSTComment = (instance, e) => {
  e.preventDefault();
  const comment_text = e.target[0].value;
  const name = e.target[1].value;
  const email = e.target[2].value;
  const county = e.target[3].value;
  const mpms = instance.props.projectId || null;
  instance.props.submitComment({ comment_text, name, email, county, mpms });
};
