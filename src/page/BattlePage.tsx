import React, { CSSProperties } from "react";
import { Subscription } from "rxjs";
import LoadingSpinner from "../component/LoadingSpinner";
import battleService from "../backend/battle.service";
import { Battle as BattleData, BattleReward, MappedUnitEffects } from "../backend/battle";
import Battle from "../component/battle/Battle";

type State = {
    status: "loading";
} | {
    status: "loaded";
    battle: BattleData;
    performingAction: boolean;
    effectsList: MappedUnitEffects[];
    reward: BattleReward | null;
} | {
    status: "loaded";
    battle: null;
} | {
    status: "generating battle";
} | {
    status: "error";
};

class BattlePage extends React.Component<{}, State> {
    readonly state: Readonly<State> = {
        status: "loading"
    };

    request?: Subscription;

    componentDidMount() {
        document.title = "Battle - PBBG";

        this.request = battleService.getBattle()
            .subscribe(
                res => this.setState(res.data !== null ? this.stateLoadedInitialBattle(res.data) : this.stateLoadedNoBattle),
                error => this.setState({ status: "error" })
            );
    }

    componentWillUnmount() {
        this.request && this.request.unsubscribe();
    }

    render() {
        if (this.state.status === "loading") return <LoadingSpinner style={{ alignSelf: "center" }} />;
        else if (this.state.status === "error") return <>ERROR</>;

        else if (this.state.status === "loaded") {
            if (this.state.battle === null) return <button className="fancy" style={{ alignSelf: "center" }} onClick={this.handleGenerateBattleClick}>
                <span>Generate battle</span>
            </button>;

            else return <Battle
                battle={this.state.battle}
                performingAction={this.state.performingAction}
                onAllyTurn={this.handleAllyTurn}
                onEnemyTurn={this.handleEnemyTurn}
                effects={this.state.effectsList}
                reward={this.state.reward}
            />;
        }

        else if (this.state.status === "generating battle") return <button className="fancy loading" disabled style={{ alignSelf: "center" }}>
            <span>Generating battle</span>
            <LoadingSpinner style={loadingStyle} />
        </button>;
    }

    stateLoadedInitialBattle = (battle: BattleData): State => ({
        status: "loaded",
        battle: battle,
        performingAction: false,
        effectsList: [],
        reward: null
    });

    stateLoadedNoBattle = (): State => ({
        status: "loaded",
        battle: null
    });

    handleGenerateBattleClick = () => {
        this.setState({ status: "generating battle" });

        this.request = battleService.generateBattle()
            .subscribe(
                res => this.setState(this.stateLoadedInitialBattle(res.data)),
                error => this.setState({ status: "error" })
            );
    };

    handleAllyTurn = (targetUnitId: number) => {
        if (this.state.status !== "loaded" || this.state.battle === null) throw Error();

        this.setState({ ...this.state, performingAction: true });
        this.request = battleService.allyTurn({ targetUnitId })
            .subscribe(
                res => {
                    if (this.state.status !== "loaded" || this.state.battle === null) throw Error();

                    this.setState({ ...this.state,
                        battle: res.data.battle,
                        performingAction: false,
                        effectsList: this.state.effectsList.concat(res.data.unitEffects),
                        reward: res.data.reward
                    });
                },
                error => this.setState({ status: "error" })
            );
    };

    handleEnemyTurn = () => {
        this.setState({ ...this.state, performingAction: true });

        this.request = battleService.enemyTurn()
            .subscribe(
                res => {
                    if (this.state.status !== "loaded" || this.state.battle === null) throw Error();

                    this.setState({ ...this.state,
                        battle: res.data.battle,
                        performingAction: false,
                        effectsList: this.state.effectsList.concat(res.data.unitEffects),
                        reward: res.data.reward
                    });
                },
                error => this.setState({ status: "error" })
            );
    };
}

const loadingStyle: CSSProperties = {
    width: "14px",
    height: "14px",
    borderWidth: "3px",
    marginLeft: "5px"
};

export default BattlePage;
