import "@testing-library/jest-dom/extend-expect";
import React from "react";
import {render, cleanup} from "@testing-library/react";
import {AppContext} from "../../components/utility/context";
import Login from "../../components/page/Login";

afterEach(cleanup);

const RenderComponent = (child, props) => {
    return render(<AppContext.Provider value={...props}>{child}</AppContext.Provider>);
};

describe("Login", () => {
    test("Form", () => {
        const {getByTestId} = RenderComponent(<Login />, {
            state: {
                login: {
                    apiResponse: {
                        isError: false,
                        response: []
                    }
                }
            }
        });
        expect(getByTestId("username")).toHaveTextContent("Username");
        expect(getByTestId("password")).toHaveTextContent("Password");
        expect(getByTestId("submit")).toHaveTextContent("Submit");
    });
    test("Form Error", () => {
        const {getByTestId} = RenderComponent(<Login />, {
            state: {
                login: {
                    apiResponse: {
                        isError: true,
                        response: [
                            {
                                msg: "Username or password is incorrect"
                            }
                        ]
                    }
                }
            }
        });
        expect(getByTestId("alert")).toHaveTextContent("Username or password is incorrect");
    });
});
