import { Modal } from 'antd';

exports.error = function (statusCode, title, content, cancelFunc) {
  let contentHeader = '';
  let cancelFunction = function () { };
  switch (statusCode) {
    case '500':
      contentHeader = '服务器内部错误: ';
      break;
    case '502':
      contentHeader = 'Session Error: ';
      cancelFunction = cancelFunc;
      break;
    default:
      contentHeader = '错误信息: ';
  }
  Modal.error({
    title: title + statusCode,
    content: contentHeader + content,
    onOk() {
      cancelFunction();
    },
  });
};
exports.warning = function (title, content) {
  Modal.warning({
    title: title,
    content: content,
    onCancel: function () { },
  });
};
exports.confirm = function (title, content, okFn) {
  Modal.confirm({
    title: title,
    content: content,
    onOk: okFn,
    onCancel: function () { },
    okText: 'Yes',
    cancelText: 'Cancel',
  });
};
