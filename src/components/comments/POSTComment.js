export const POSTComment = (submit, id, e) => {
  e.preventDefault();
  const comment_text = e.target[0].value;
  const name = e.target[1].value;
  const email = e.target[2].value;
  const county = e.target[3].value;
  const mpms = id || null;
  submit({ comment_text, name, email, county, mpms });
};
