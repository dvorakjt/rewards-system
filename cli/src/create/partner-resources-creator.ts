import { injectable } from "inversify";
import * as fs from "fs";
import { getFileExtension } from "../utils";
import type { IPartnerResourcesCreator } from "./i-partner-resources-creator";
import type { PartnerData } from "./partner-data";

@injectable()
export class PartnerResourcesCreator implements IPartnerResourcesCreator {
  createPartnerResources(partnerData: PartnerData): void {
    this.createPartnerFolder(partnerData.id);
    this.createPartnerConstants(
      partnerData.id,
      partnerData.name,
      partnerData.environmentVariables
    );
    this.createLambdaFunction(partnerData.id);
    this.copyImage(partnerData.id, partnerData.imagePath);
  }

  private createPartnerFolder(partnerId: string) {
    fs.mkdirSync("../../app/partners/" + partnerId);
  }

  private createPartnerConstants(
    partnerId: string,
    partnerName: string,
    environmentVariables: string[]
  ) {
    let fileContents = "";
    fileContents += `export const PARTNER_NAME = '${this.escapeSingleQuotes(
      partnerName
    )}';\n\n`;
    fileContents += `export const ENVIRONMENT_VARIABLES = {`;

    if (environmentVariables.length) {
      fileContents += "\n";
      environmentVariables.forEach((variable) => {
        fileContents += `  ${variable}: "${variable}",\n`;
      });
    }

    fileContents += "};\n";

    fs.writeFileSync(
      `../../app/partners/${partnerId}/constants.ts`,
      fileContents,
      "utf-8"
    );
  }

  private escapeSingleQuotes(str: string) {
    return str.replace(/'/g, "\\'");
  }

  private createLambdaFunction(partnerId: string) {
    let fileContents = "";
    fileContents += "import { ENVIRONMENT_VARIABLES } from './constants';\n";
    fileContents += "import { loadSecrets } from '../utils/load-secrets';\n\n";
    fileContents += "export default async function handler() {\n";
    fileContents +=
      "  const secrets = await loadSecrets(ENVIRONMENT_VARIABLES);\n";
    fileContents += "}\n";

    fs.writeFileSync(
      `../../app/partners/${partnerId}/lambda.ts`,
      fileContents,
      "utf-8"
    );
  }

  private copyImage(partnerId: string, imagePath: string) {
    const extension = getFileExtension(imagePath);
    fs.copyFileSync(
      imagePath,
      `../../app/partners/${partnerId}/${partnerId}-logo.${extension}`
    );
  }
}
