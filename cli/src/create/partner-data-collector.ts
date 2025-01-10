import { injectable } from "inversify";
import { input, confirm } from "@inquirer/prompts";
import * as fs from "fs";
import type { IPartnerDataCollector } from "./i-partner-data-collector";
import type { PartnerData } from "./partner-data";

@injectable()
export class PartnerDataCollector implements IPartnerDataCollector {
  private readonly VALID_ID_CHARACTERS_MSG =
    "Valid characters are A-Z, a-z, 0-9, and -";
  private readonly VALID_ENV_VARIABLE_CHARS_MSG =
    "Valid characters are A-Z and _";

  async collectPartnerData(): Promise<PartnerData> {
    const name = await this.collectPartnerName();
    const id = await this.collectPartnerId(name);
    const environmentVariables = await this.collectEnvironmentVariables();
    const imagePath = await this.collectImagePath();

    return {
      name,
      id,
      environmentVariables,
      imagePath,
    };
  }

  private async collectPartnerName(): Promise<string> {
    let partnerName = "";

    do {
      partnerName = await input({
        message: "Please enter the human-readable name for the partner.",
      });
      partnerName = partnerName.trim();
    } while (!partnerName);

    return partnerName;
  }

  private async collectPartnerId(partnerName: string): Promise<string> {
    const defaultId = this.generateDefaultId(partnerName);
    const useDefaultId = await this.shouldUseDefaultId(defaultId);

    if (useDefaultId) {
      return defaultId;
    }

    const customId = await this.collectCustomId();
    return customId;
  }

  private generateDefaultId(partnerName: string): string {
    let defaultId = partnerName
      .toLowerCase()
      .replace(/\s/g, "-")
      .replace(/[^A-Za-z0-9\-]/g, "");

    if (this.isIdAvailable(defaultId)) {
      return defaultId;
    }

    return this.incrementDefaultId(defaultId);
  }

  private incrementDefaultId(defaultId: string): string {
    let i = 1;
    defaultId += `-${i}`;

    while (!this.isIdAvailable(defaultId)) {
      defaultId = defaultId.slice(0, -1);
      defaultId += ++i;
    }

    return defaultId;
  }

  private isIdValid(id: string): boolean {
    return /^[A-Za-z0-9\-]+$/.test(id);
  }

  private isIdAvailable(id: string): boolean {
    const partners = fs.readdirSync("../../app/partners");
    return !partners.includes(id);
  }

  private async shouldUseDefaultId(defaultId: string): Promise<boolean> {
    const useDefaultId = await confirm({
      message: `Would you like to use the suggested partner id "${defaultId}"? `,
    });
    return useDefaultId;
  }

  private async collectCustomId(): Promise<string> {
    let partnerId = "";

    do {
      partnerId = await input({
        message: "Enter a custom partner id. " + this.VALID_ID_CHARACTERS_MSG,
      });

      if (!this.isIdValid(partnerId)) {
        console.warn(
          "The id you entered was invalid. " + this.VALID_ID_CHARACTERS_MSG
        );
      } else if (!this.isIdAvailable(partnerId)) {
        console.warn("The id you entered is already in use!");
      }
    } while (!this.isIdValid(partnerId) || !this.isIdAvailable(partnerId));

    return partnerId;
  }

  private async collectEnvironmentVariables(): Promise<string[]> {
    const environmentVariables: string[] = [];

    let addEnvironmentVariable = await confirm({
      message:
        "Will the lambda function for this partner require any environment variables?",
    });

    while (addEnvironmentVariable) {
      let variable = await input({
        message:
          "Enter the name for the environment variable. " +
          this.VALID_ENV_VARIABLE_CHARS_MSG,
      });

      variable = variable.trim();

      if (variable) {
        if (!this.isEnvironmentVariableValid(variable)) {
          console.warn(
            "The value you have entered is invalid. " +
              this.VALID_ENV_VARIABLE_CHARS_MSG
          );
          continue;
        } else if (environmentVariables.includes(variable)) {
          console.warn("You have already entered this variable name!");
          continue;
        } else {
          environmentVariables.push(variable);
        }
      }

      addEnvironmentVariable = await confirm({
        message: "Add another environment variable? ",
      });
    }

    return environmentVariables;
  }

  private isEnvironmentVariableValid(variable: string) {
    return /^[A-Z_]+$/.test(variable);
  }

  private async collectImagePath(): Promise<string> {
    return "";
  }

  private isImagePathValid(): boolean {
    return true;
  }
}
