Date.prototype.toDateInputValue = (function() {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0, 10);
});

window.fn = {}
const ls = localStorage;

let utils = window.fn;
utils.currentToken = ls.getItem('token');

utils.listenEnter = function (handler) {
    fn.jquery('input').on('keypress', function (e) {
        if (e.which === 13) handler();
    });
}

utils.alertError = function (message = '', options = {}) {
    const templateId = new Date().getTime();
    const template = `
        <div class="pmd-alert-container right top alert-dismissible alert-${templateId}" style="margin-top: 50px;right: 10px;">
            <div class="pmd-alert visible fadeInDown" data-action="true" style="min-width: 100px;width: auto;padding-right: 35px;">
                ${message}
                <a href="javascript:void(0)" class="pmd-alert-close" onclick="fn.dismissAlert('${templateId}')">×</a>
            </div>
        </div>`;
    fn.jquery('body').append(template);
    setTimeout(function () {
        utils.dismissAlert(templateId);
    }, 5 * 1000);
}

utils.dismissAlert = function (templateId) {
    fn.jquery(`.alert-${templateId}`).remove();
}

utils.removeElement = function (selector) {
    try {
        selector = fn.jquery(selector);
        selector.remove();
    } catch (err) {
        console.log(err);
    }
}

utils.sendXHR = function (opt) {
    return new Promise(function (resolve, reject) {
        if (!opt.headers) opt.headers = {'x-lang': ls.getItem('lang') || 'en'}
        if (utils.currentToken) opt.headers['x-auth-token'] = utils.currentToken;
        opt.success = function (res) {
            resolve(res);
        }
        opt.error = function (err) {
            if (err.status === 402) window.location.href = '/logout';
            reject(err.responseJSON);
        }
        $.ajax(opt);
    })
}

utils.jquery = function (selector) {
    return $(this.selectors[selector] || selector);
}

utils.getInputValue = function (selectors) { // selectors => object
    try {
        if (!selectors) throw new Error('No Selector');
        if (Object.keys(selectors).length <= 0) throw new Error('No Selector Defined');
        if (typeof selectors === 'object') {
            let jquerySelectors = {}
            for (let x in selectors) {
                const s = selectors[x];
                jquerySelectors[x] = this.jquery(this.selectors[s] || s).val();
            }
            return jquerySelectors;
        } else {
            return this.jquery(this.selectors[selectors] || selectors).val();
        }
    } catch (err) {
        console.log(selectors);
        utils.alertError(err.message);
    }
}

utils.setInputValue = function (selector, value) {
    const obj = utils.jquery(selector);
    obj.val(value);
}

utils.show = function (selectors = []) {
    if (selectors) {
        if (typeof selectors !== 'object') selectors = [selectors];
        for (const selector of selectors) {
            utils.jquery(selector).removeClass('hide');
        }
    }
}

utils.hide = function (selectors = []) {
    if (selectors) {
        if (typeof selectors !== 'object') selectors = [selectors];
        for (const selector of selectors) {
            utils.jquery(selector).addClass('hide');
        }
    }
}

utils.confirm = function (obj) {
    const o = fn.jquery(obj)
    const data = o.data();
    utils.jquery('#confirmation').modal('show');
    utils.jquery('#handle-yes')
        .attr('onclick', data.action)
        .attr('data-deleted', data.id);
}

utils.showModal = function (selector = '') {
    if (selector) {
        utils.jquery(selector).modal('show');
    }
}

utils.hideModal = function (selector = '') {
    if (selector) {
        utils.jquery(selector).modal('hide');
    }
}

const currentUser = ls.getItem('username');
$('#current-user').html(currentUser);