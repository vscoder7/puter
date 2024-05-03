/*
    Plan:
        Components: OneAtATimeView < ... >

        Screen 1: QR code and entry box for testing
            Components: Flexer < QRCodeView, CodeEntryView, ActionsView >
            Logic:
            - when CodeEntryView has a value, check it against the QR code value...
              ... then go to the next screen
              - CodeEntryView will have callbacks: `verify`, `on_verified`
            - cancel action

        Screen 2: Recovery codes
            Components: Flexer < RecoveryCodesView, ConfirmationsView, ActionsView >
            Logic:
            - done action
            - cancel action
            - when done action is clicked, call /auth/configure-2fa/enable

*/

import CodeEntryView from "./Components/CodeEntryView.js";
import Flexer from "./Components/Flexer.js";
import QRCodeView from "./Components/QRCode.js";
import UIComponentWindow from "./UIComponentWindow.js";

const UIWindow2FASetup = async function UIWindow2FASetup () {
    const resp = await fetch(`${api_origin}/auth/configure-2fa/setup`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${puter.authToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
    });
    const data = await resp.json();

    const component = new Flexer({
        children: [
            new QRCodeView({
                value: data.url,
            }),
            new CodeEntryView({
                on_update () {
                    // NEXT
                }
            }),
        ]
    });

    UIComponentWindow({
        component,
    });
}

export default UIWindow2FASetup;
