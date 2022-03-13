const List = {
  list: [],
  getList: function () {
    return (
      (localStorage.getItem("theList") &&
        JSON.parse(localStorage.getItem("theList"))) ||
      this.list
    );
  },
  saveList: (list) => {
    localStorage.setItem("theList", JSON.stringify(list));
  },
};

export default List;
