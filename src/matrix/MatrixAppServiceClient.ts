import { doClientApiCall } from "./helpers";
import AppService from "../db/models/AppService";

export interface MatrixUserResponse {
    access_token: string;
    device_id: string;
    home_server: string;
    user_id: string;
}

export class MatrixAppServiceClient {

    constructor(private appservice: AppService) {
    }

    public async registerUser(localpart: string): Promise<MatrixUserResponse> {
        return doClientApiCall(
            "POST",
            "/_matrix/client/r0/register",
            {access_token: this.appservice.asToken},
            {type: "m.login.application_service", username: localpart},
        );
    }

    public async whoAmI(): Promise<string> {
        const response = await doClientApiCall(
            "GET",
            "/_matrix/client/r0/account/whoami",
            {access_token: this.appservice.asToken},
        );
        return response['user_id'];
    }

    public async leaveRoom(virtualUserId: string, roomId: string): Promise<any> {
        return doClientApiCall(
            "POST",
            "/_matrix/client/r0/rooms/" + encodeURIComponent(roomId) + "/leave",
            {access_token: this.appservice.asToken, user_id: virtualUserId},
            {},
        );
    }
}
