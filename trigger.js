var $pop = $('#spch')

var record = false
var trigger = function() {
    document.getElementById('gsri_ok0').click()
    record = true
}

var check = function() {
    if (!$pop.is(':visible')) {
        if (record) {
            var text = $('#lst-ib').val();
            var data = {
                type: 'result',
                data: text
            }
            SendMsg(JSON.stringify(data))
            console.log();
        }
        record = false
        //trigger()
    }
}
setInterval("check()", 200)

var ws = null;

function WebSocketConn() {
    if (ws != null && ws.readyState == 1) {
        log("已经在线");
        return
    }

    if ("WebSocket" in window) {
        // Let us open a web socket
        ws = new WebSocket("wss://ws.test.com/s/134");

        ws.onopen = function() {
            log('成功进入聊天室');
        };

        ws.onmessage = function(event) {
            try
            {
                var data = JSON.parse(event.data)
            }
            catch (e)
            {
                log(e.message)
                return
            }

            if (data && data.type == 'recognition') {
                trigger();
            }
        };

        ws.onclose = function() {
            // websocket is closed.
            log("已经和服务器断开");
            //WebSocketConn();
        };

        ws.onerror = function(event) {
            console.log("error " + event.data);
        };
    } else {
        // The browser doesn't support WebSocket
        alert("WebSocket NOT supported by your Browser!");
    }
}

function SendMsg(msg) {
    if (ws != null && ws.readyState == 1) {
        ws.send(msg);
    }
}

function WebSocketClose() {
    if (ws != null && ws.readyState == 1) {
        ws.close();
        log("发送断开服务器请求");
    } else {
        log("当前没有连接服务器")
    }
}

function log(text) {
    console.log(text)
    return false;
}

WebSocketConn()
