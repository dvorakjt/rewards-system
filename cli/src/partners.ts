import { appContainer } from "./container";
import * as CreateModule from "./create";
import { Command } from "commander";

const program = new Command();

program
  .command("create")
  .description("Creates resources for a new partner in app/partners.")
  .action(() => {
    const partnerCreator = appContainer.get<CreateModule.IPartnerCreator>(
      CreateModule.TYPES.IPartnerCreator
    );
    partnerCreator.createPartner();
  });

program
  .command("list")
  .description("Lists all partners.")
  .option("-v, --verbose")
  .action((options) => {
    console.log("list");
    console.log(options.verbose);
  });

program
  .command("remove")
  .description(
    "Removes all resources from app/partners for the partner with the provided id."
  )
  .argument("<id>", "id of the partner that should be removed.")
  .action((id) => {
    console.log(id);
  });

program.parse();
