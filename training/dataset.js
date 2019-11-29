// const dataset = [
//    { text: 'hello', category: 'greeting' },
//    { text: 'hi', category: 'greeting' },
//    { text: 'xin chào', category: 'greeting' },
//    { text: 'chào', category: 'greeting' },
//    { text: 'bắt đầu', category: 'greeting' },
//
//    { text: 'hẹn', category: 'book' },
//    { text: 'đặt', category: 'book' },
//    { text: 'đặt lịch', category: 'book' },
//    { text: 'hẹn lịch', category: 'book' },
//    { text: 'hẹn giờ', category: 'book' },
//    { text: 'lịch hẹn', 'category': 'book' },
//
//    { text: 'tư vấn', category: 'assistant' },
//    { text: 'giúp đỡ', category: 'assistant' },
//    { text: 'hỗ trợ', category: 'assistant' },
//    { text: 'chi tiết', category: 'assistant' },
//    { text: 'mô tả', category: 'assistant' },
//    { text: 'hiểu biết', category: 'assistant' },
//    { text: 'nói qua', category: 'assistant' },
//    { text: 'biết thêm', category: 'assistant' },
//    { text: 'thông tin', category: 'assistant' },
//
//    { text: 'hủy', category: 'cancel' },
//    { text: 'hủy lịch', category: 'cancel' },
//    { text: 'xóa', category: 'cancel' },
//    { text: 'xóa lịch', category: 'cancel' },
//    { text: 'hủy hẹn', category: 'cancel' },
//    { text: 'xóa hẹn', category: 'cancel' },
//    { text: 'không khám nữa', category: 'cancel' },
//
//    { text: 'đổi', category: 'update' },
//    { text: 'dời', category: 'update' },
//    { text: 'thay đổi lịch', category: 'update' },
//    { text: 'dời lịch', category: 'update' },
//    { text: 'thay đổi giờ', category: 'update' },
//    { text: 'dời giờ', category: 'update' },
// ];
//
// module.exports = dataset;
module.exports = [
   { text: 'hi', category: 'greeting' },
   { text: 'hello', category: 'greeting' },
   { text: 'xin chào', category: 'greeting' },
   { text: 'chào', category: 'greeting' },

   { text: 'đặt lịch hẹn', category: 'book' },
   { text: 'hẹn lịch khám', category: 'book' },
   { text: 'tôi muốn hẹn lịch', category: 'book' },
   { text: 'tôi muốn đặt lịch hẹn và hẹn lịch', category: 'book' },
   { text: 'tôi muốn hẹn lịch khám bệnh', category: 'book' },
   { text: 'tôi cần bạn đặt lịch khám bệnh giúp tôi', category: 'book' },

   { text: 'tôi cần được hỗ trợ', category: 'assistant' },
   { text: 'bạn có thể hỗ trợ tôi được không', category: 'assistant' },
   { text: 'tôi cần được tư vấn và trợ giúp', category: 'assistant' },
   { text: 'tôi có thể biết thêm thông tin về chương trình được không', category: 'assistant' },
   { text: 'tôi muốn biết thêm về thông tin và lịch trình khám', category: 'assistant' },
   { text: 'bạn có thể nói qua về chế độ khám bệnh cho tôi được không', category: 'assistant' },

   { text: 'hủy lịch hẹn', category: 'cancel' },
   { text: 'xóa lịch hẹn', category: 'cancel' },
   { text: 'tôi muốn hủy lịch hẹn', category: 'cancel' },
   { text: 'tôi muốn xóa lịch khám bệnh', category: 'cancel' },
   { text: 'tôi cần bạn hủy lịch khám bệnh giúp tôi', category: 'cancel' },

   { text: 'thay đổi lịch hẹn', category: 'update' },
   { text: 'dời lịch hẹn', category: 'update' },
   { text: 'tôi muốn thay đổi lịch hẹn', category: 'update' },
   { text: 'tôi muốn dời lịch khám bệnh', category: 'update' },
   { text: 'tôi cần bạn thay đổi lịch khám bệnh giúp tôi', category: 'update' },

   { text: 'kiểm tra lịch hẹn', category: 'check' },
   { text: 'xem lịch hẹn', category: 'check' },
   { text: 'tôi muốn kiểm tra lịch hẹn', category: 'check' },
   { text: 'tôi muốn xem lại lịch khám bệnh', category: 'check' },
   { text: 'tôi cần bạn kiểm tra lịch khám bệnh giúp tôi', category: 'check' },
];