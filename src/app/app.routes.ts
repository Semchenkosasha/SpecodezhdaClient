import {Routes} from '@angular/router';
import {ErrorComponent} from "./error/error.component";
import {StatsComponent} from "./stats/stats.component";
import {UserComponent} from "./user/user.component";
import {LoginComponent} from "./auth/login/login.component";
import {RegComponent} from "./auth/reg/reg.component";
import {MainComponent} from "./main/main.component";
import {ProfileComponent} from "./profile/profile.component";
import {PositionComponent} from "./position/position.component";
import {WorkwearComponent} from "./workwear/workwear.component";
import {WorkwearPageComponent} from "./workwear/workwear-page/workwear-page.component";
import {WorkwearAddComponent} from "./workwear/workwear-add/workwear-add.component";
import {WorkwearUpdateComponent} from "./workwear/workwear-update/workwear-update.component";
import {InventoryComponent} from "./inventory/inventory.component";
import {InventoryCategoryComponent} from "./inventory-category/inventory-category.component";
import {InventoryPageComponent} from "./inventory/inventory-page/inventory-page.component";
import {InventoryAddComponent} from "./inventory/inventory-add/inventory-add.component";
import {InventoryUpdateComponent} from "./inventory/inventory-update/inventory-update.component";
import {WorkwearOrderingComponent} from "./workwear-ordering/workwear-ordering.component";
import {WorkwearOrderingMyComponent} from "./workwear-ordering/workwear-ordering-my/workwear-ordering-my.component";
import {InventoryOrderingComponent} from "./inventory-ordering/inventory-ordering.component";
import {InventoryOrderingMyComponent} from "./inventory-ordering/inventory-ordering-my/inventory-ordering-my.component";

export const routes: Routes = [

	{path: "", component: MainComponent},

	{path: "reg", component: RegComponent},
	{path: "login", component: LoginComponent},

	{path: "users", component: UserComponent},

	{path: "profile", component: ProfileComponent},

	{path: "positions", component: PositionComponent},

	{path: "workwears", component: WorkwearComponent},
	{path: "workwear", component: WorkwearPageComponent},
	{path: "workwear_add", component: WorkwearAddComponent},
	{path: "workwear_update", component: WorkwearUpdateComponent},

	{path: "workwears_orderings", component: WorkwearOrderingComponent},
	{path: "workwears_orderings_my", component: WorkwearOrderingMyComponent},

	{path: "inventory_categories", component: InventoryCategoryComponent},
	{path: "inventories", component: InventoryComponent},
	{path: "inventory", component: InventoryPageComponent},
	{path: "inventory_add", component: InventoryAddComponent},
	{path: "inventory_update", component: InventoryUpdateComponent},

	{path: "inventories_orderings", component: InventoryOrderingComponent},
	{path: "inventories_orderings_my", component: InventoryOrderingMyComponent},

	{path: "stats", component: StatsComponent},

	{path: "error", component: ErrorComponent},
	{path: "**", component: ErrorComponent},

];
