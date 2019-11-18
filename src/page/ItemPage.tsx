import React from "react";
import { RouteComponentProps } from "react-router";
import LoadingSpinner from "../component/LoadingSpinner";
import { Subscription } from "rxjs";
import itemService from "../backend/item.service";
import { ItemDetails, ItemHistoryInfo } from "../backend/item";
import "./ItemPage.scss";

interface Props extends RouteComponentProps<{ id: string }> {}

type State = {
    status: "loading";
} | {
    status: "error";
} | {
    status: "loaded";
    itemDetails: ItemDetails;
};

class ItemPage extends React.Component<Props, State> {
    readonly state: Readonly<State> = {
        status: "loading"
    };

    request?: Subscription;

    componentDidMount() {
        document.title = "Item - PBBG";

        this.request = itemService.getItem(this.props.match.params.id)
            .subscribe(
                res => this.setState({ status: "loaded", itemDetails: res.data }),
                error => this.setState({ status: "error" })
            )
    }

    render() {
        if (this.state.status === "loading") return <LoadingSpinner />;
        else if (this.state.status === "error") return "ERROR";

        const { item, history, linkedUserInfo } = this.state.itemDetails;

        return <div className="ItemPage">
            <div>
                <h2>{item.baseItem.friendlyName}</h2>
                <img src={item.baseItem.img64} alt={item.baseItem.friendlyName + " sprite"} />
            </div>
            <div>
                <h4>History</h4>
                <ol>
                    {history
                        .sort((a, b) => b.date - a.date) // Sort by descending
                        .map((entry, index) =>
                                <li key={index}>
                                    <ItemHistoryEntryDescription info={entry.info} userDetails={linkedUserInfo} />
                                    <ItemHistoryEntryDate date={entry.date} />
                                </li>
                        )
                    }
                </ol>
            </div>
        </div>;
    }
}

const ItemHistoryEntryDescription: React.FC<{ info: ItemHistoryInfo, userDetails: Record<number, string> }> = ({ info, userDetails }) => {
    let content: JSX.Element;

    switch (info.type) {
        case "created-user":
            content = <>Created with <a href={`/user/${info.userId}`}>{userDetails[info.userId]}</a></>;
            break;
        case "created-market":
            content = <>Created in market</>;
            break;
        case "first-mined":
            content = <>Mined by <a href={`/user/${info.userId}`}>{userDetails[info.userId]}</a></>;
            break;
        default:
            throw Error();
    }

    return <span className="ItemHistoryEntryDescription">{content}</span>
};

const ItemHistoryEntryDate: React.FC<{ date: number }> = ({ date }) => <span className="ItemHistoryEntryDate">—{(new Date(date * 1000)).toString()}</span>;

export default ItemPage;
