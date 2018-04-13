// this function is gross and inefficient and will break w/more than 2 tabs but it's friday
export const switchTabs = (instance, e) => {
  // get a handle on the button clicked
  const button = e.target.textContent;

  // get a handle on data tables
  let fundingTable = instance.funding;
  let milestonesTable = instance.milestones;

  // get a handle on the table associated with the button
  const associatedTable =
    fundingTable.id === button ? fundingTable : milestonesTable;
  const otherTable =
    associatedTable === fundingTable ? milestonesTable : fundingTable;

  // do nothing if visible, show if invisible
  if (associatedTable.classList.contains("hidden")) {
    associatedTable.classList.remove("hidden");
    otherTable.classList.add("hidden");
  }
};
