import React from "react";
import { Subscription } from "rxjs";
import LoadingSpinner from "../component/LoadingSpinner";
import battleService from "../backend/battle.service";
import { Battle as BattleData, BattleReward, MappedUnitEffects } from "../backend/battle";
import Battle from "../component/battle/Battle";
import LoadingButton from "../component/LoadingButton";

interface LoadingState {
    status: "loading";
}

interface InBattleState {
    status: "in battle";
    battle: BattleData;
    performingAction: boolean;
    effectsList: MappedUnitEffects[];
    reward: BattleReward | null;
}

interface NoBattleState {
    status: "no battle";
}

interface GeneratingBattleState {
    status: "generating battle";
}

interface ErrorState {
    status: "error";
}

type State = LoadingState | InBattleState | NoBattleState | GeneratingBattleState | ErrorState;

class BattlePage extends React.Component<{}, State> {
    readonly state: Readonly<State> = {
        status: "loading"
    };

    request?: Subscription;

    componentDidMount() {
        document.title = "Battle - PBBG";

        this.request = battleService.getBattle()
            .subscribe(
                res => this.setState(res.data !== null ? this.stateInitialInBattle(res.data) : { status: "no battle" }),
                error => this.setState({ status: "error" })
            );
    }

    componentWillUnmount() {
        this.request && this.request.unsubscribe();
    }

    render() {
        switch (this.state.status) {
            case "loading":
                return <LoadingSpinner style={{ alignSelf: "center" }} />;
            case "error":
                return <>ERROR</>;
            case "no battle":
                return <button className="fancy" style={{ alignSelf: "center" }} onClick={this.handleGenerateBattleClick}>
                    <span>Generate battle</span>
                </button>;
            case "generating battle":
                return <LoadingButton loading={true} style={{ alignSelf: "center" }}>Generating battle…</LoadingButton>;
            case "in battle":
                return <Battle
                    battle={this.state.battle}
                    performingAction={this.state.performingAction}
                    onAllyTurn={this.handleAllyTurn}
                    onEnemyTurn={this.handleEnemyTurn}
                    effects={this.state.effectsList}
                    reward={this.state.reward}
                />;
        }
    }

    stateInitialInBattle = (battle: BattleData): InBattleState => ({
        status: "in battle",
        battle: battle,
        performingAction: false,
        effectsList: [],
        reward: null
    });

    handleGenerateBattleClick = () => {
        this.setState({ status: "generating battle" });

        this.request = battleService.generateBattle()
            .subscribe(
                res => this.setState(this.stateInitialInBattle(res.data)),
                error => this.setState({ status: "error" })
            );
    };

    handleAllyTurn = (targetUnitId: number) => {
        if (this.state.status !== "in battle") throw Error();

        this.setState({ ...this.state, performingAction: true });

        this.request = battleService.allyTurn({ targetUnitId })
            .subscribe(
                res => {
                    if (this.state.status !== "in battle") throw Error();

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
        if (this.state.status !== "in battle") throw Error();

        this.setState({ ...this.state, performingAction: true });

        this.request = battleService.enemyTurn()
            .subscribe(
                res => {
                    if (this.state.status !== "in battle") throw Error();

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

export default BattlePage;
