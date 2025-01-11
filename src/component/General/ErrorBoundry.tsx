import React from "react"
import { View } from "react-native"
import AppText from './AppText';
import { IErrorBoundary, IStateErrorBoundary } from "../../utiltes/Type/Component";
import themes from "../../utiltes/Themes";
export default class ErrorBoundary extends React.Component<IErrorBoundary, IStateErrorBoundary> {
    constructor(props: any) {
        super(props)
        this.state = { error: false }
    }
    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        this.setState({ error: true })
    }
    render() {
        if (this.state.error)
            return (
                <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: themes.white }}>
                    <AppText text="Error"></AppText>
                </View>
            )
        return (
            this.props.children
        )

    }
}