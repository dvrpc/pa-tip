export const switchTabs = (instance, e) => {
  // get a handle on the buttons
  const button = e.target;
  let otherButton =
    instance.fundingButton === button
      ? instance.milestonesButton
      : instance.fundingButton;

  // get a handle on data tables
  let fundingTable = instance.funding;
  let milestonesTable = instance.milestones;

  // get a handle on the table associated with the button
  const associatedTable =
    fundingTable.id === button.textContent ? fundingTable : milestonesTable;
  const otherTable =
    associatedTable === fundingTable ? milestonesTable : fundingTable;

  // do nothing if visible, show if invisible
  if (associatedTable.classList.contains("hidden")) {
    // set the new active table & button
    button.classList.add("active");
    associatedTable.classList.remove("hidden");

    // set the inactive table & button
    otherTable.classList.add("hidden");
    otherButton.classList.remove("active");
  }
};
