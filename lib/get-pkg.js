const path = require("path");
const readPkg = require("read-pkg");
const AggregateError = require("aggregate-error");

module.exports = async ({ pkgRoot }, { cwd }) => {
  try {
    const pkg = await readPkg({ cwd: pkgRoot ? path.resolve(cwd, String(pkgRoot)) : cwd });

    if (!pkg.name) {
      throw getError("ENOPKGNAME");
    }

    return pkg;
  } catch (error) {
    if (error.code === "ENOENT") {
      throw new AggregateError("ENOPKG");
    } else {
      throw new AggregateError([error]);
    }
  }
};
