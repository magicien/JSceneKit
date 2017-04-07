#!/bin/bash

JS_DIR="${0%/*}/js"
MAIN_JS="${JS_DIR}/main.js"
CONSTANTS_JS="${JS_DIR}/constants.js"

FILES=`find ${JS_DIR} -name \*.js`

cat /dev/null > ${MAIN_JS}

# import files
for FILE in ${FILES}; do
  FILE_PATH=${FILE#${JS_DIR}}
  FILE_PATH=${FILE_PATH%.js}
  CLASS=${FILE_PATH##*/}
  CATEGORY=${FILE%/*}
  CATEGORY=${CATEGORY##*/}

  if [ "${CLASS}" != "main" \
      -a "${CLASS}" != "constants" \
      -a "${CATEGORY}" != "third_party" ]; then
    echo "import ${CLASS} from '.${FILE_PATH}'" >> ${MAIN_JS}
  fi
done

# register classes to ClassList
echo "" >> ${MAIN_JS}
for FILE in ${FILES}; do
  CLASS=${FILE##*/}
  CLASS=${CLASS%.js}
  CATEGORY=${FILE%/*}
  CATEGORY=${CATEGORY##*/}

  if [ "${CLASS}" != "main" \
      -a "${CLASS}" != "constants" \
      -a "${CATEGORY}" != "third_party" \
      -a "${CATEGORY}" != "util" ]; then
    echo "_ClassList.registerClass(${CLASS})" >> ${MAIN_JS}
  fi
done
  
# export classes
echo "" >> ${MAIN_JS}
echo "/*global exports*/" >> ${MAIN_JS}

for FILE in ${FILES}; do
  CLASS=${FILE##*/}
  CLASS=${CLASS%.js}
  CATEGORY=${FILE%/*}
  CATEGORY=${CATEGORY##*/}

  if [ "${CLASS}" != "main" \
    -a "${CLASS}" != "constants" \
    -a "${CATEGORY}" != "third_party" ]; then
    echo "exports.${CLASS} = ${CLASS}" >> ${MAIN_JS}
  fi
done

echo "" >> ${MAIN_JS}
echo "// constants" >> ${MAIN_JS}
cat ${CONSTANTS_JS} >> ${MAIN_JS}
