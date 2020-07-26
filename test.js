let myData = [
  { ques: "Who is the “Queen of Pop”" },
  { ques: "Dirichlet là người nước nào " },
  {
    ques:
      "Tháng 5/2008, quốc gia nào quyết định rời khỏi Tổ chức xuất khẩu dầu mỏ thế giới OPEC",
  },
  {
    ques:
      "Nằm bên dãy Hoàng Liên Sơn, Mù Căng Chải là huyện vùng sâu vùng xa của tỉnh",
  },
  {
    ques:
      "Khi vị trí Mặt Trời, Mặt Trăng, Trái Đất có vị trí như thế nào thì dao động của thủy triều là lớn nhất",
  },
  { ques: "EURO lần đầu tiên tổ chức tại quốc gia nào?" },
  {
    ques:
      "Cáp quang là dây dẫn sáng ứng dụng hiện tượng gì để truyền tín hiệu trong thông tin",
  },
  {
    ques:
      "Câu ca dao về nạn giặc cướp: Thương em anh cũng muốn vô/Sợ truông nhà Hồ, sợ phá...........",
  },
];
dbo.collection("questions").insertMany(myData, function (err, res) {
  if (err) throw err;
  console.log("insert : " + res.insertedCount);
  db.close();
});
socket.emit("add point", {
  name: this.state.data[this.state.currentUser].name,
  point: this.state.data[this.state.currentUser].score + 10,
});
//===========================================================================================

// onSubmit = (e) => {
//   e.preventDefault();
//   let { data } = this.state;
//   console.log(data);
//   if (data) {
//     for (let i = 0; i < data.length; i++) {
//       if (
//         this.state.gmail == data[i].gmail &&
//         this.state.password == data[i].pass
//       ) {
//         localStorage.setItem("tooken", i);
//       }
//     }
//   }
//   if (localStorage.tooken == null) {
//     alert("login false");
//   }
//   this.setState({
//     gmail: "",
//     password: "",
//   });
// };

// onLogin = (e) => {
//   this.setState({
//     [e.target.name]: e.target.value,
//   });
// };
