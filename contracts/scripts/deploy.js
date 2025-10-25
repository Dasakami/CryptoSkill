async function main() {
  const SkillNFT = await ethers.getContractFactory("SkillNFT");
  const skillNFT = await SkillNFT.deploy();
  await skillNFT.waitForDeployment();
  
  console.log("SkillNFT deployed to:", await skillNFT.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});