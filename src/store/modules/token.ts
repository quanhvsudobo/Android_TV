// store/modules/widgets.ts
import {VuexModule, Module, Mutation, Action} from 'vuex-module-decorators';
import Widget from "@/models/Widget"
import VTSApi from "@/api/VTSApi"

@Module({namespaced: true})

class Token extends VuexModule {
    // public widgets: Array<Widget> = [];

    // public current: Widget = {} as Widget;

    // @Action({rawError: true})
    // public loadWidgets(widgetId = 0): Promise<any> {
    //     let api = new VTSApi();
    //     let self = this;
    //     return api.get_widget()
    //         .then(function (response: any) {
    //             self.context.commit('setWidgets', response.data.widgets as Array<Widget>);
    //             return 'success';
    //         });
    // }

    // @Mutation
    // public setWidgets(all: Array<any>): void {
    //     this.widgets = all;
    // }

    // @Mutation
    // public setCurrent(one: Widget): void {
    //     this.current = one;
    // }
}

export default Token
