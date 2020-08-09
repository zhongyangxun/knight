import React from 'react';
import Icon from '../Icon/icon';
import Progress from '../Progess/progress';
export var UploadList = function (props) {
    var fileList = props.fileList, onRemove = props.onRemove;
    return (React.createElement("ul", { className: "knight-upload-list" }, fileList.map(function (item) {
        var status = item.status, name = item.name, uid = item.uid, percent = item.percent;
        return (React.createElement("li", { className: "knight-upload-list-item", key: uid },
            React.createElement("span", { className: "file-name file-name-" + status },
                React.createElement(Icon, { icon: "file-alt", theme: status === 'error' ? 'danger' : 'secondary' }),
                name),
            React.createElement("span", { className: "file-status" },
                (status === 'uploading' || status === 'ready') && React.createElement(Icon, { icon: "spinner", spin: true, theme: "primary" }),
                status === 'success' && React.createElement(Icon, { icon: "check-circle", theme: "success" }),
                status === 'error' && React.createElement(Icon, { icon: "times-circle", theme: "danger" })),
            React.createElement("span", { className: "file-actions" },
                React.createElement(Icon, { icon: "times", onClick: function () { onRemove(item); } })),
            status === 'uploading' && React.createElement("div", { className: "file-progress" },
                React.createElement(Progress, { percent: percent || 0 }))));
    })));
};
export default UploadList;
