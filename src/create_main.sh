#!/bin/bash

JS_DIR="${0%/*}/js"
MAIN_JS="${JS_DIR}/main.js"

FILES=`find ${JS_DIR} -name \*.js`

cat /dev/null > ${MAIN_JS}

for FILE in ${FILES}; do
  FILE_PATH=${FILE#${JS_DIR}}
  FILE_PATH=${FILE_PATH%.js}
  CLASS=${FILE_PATH##*/}

  if [ "${CLASS}" != "main" ]; then
    echo "import ${CLASS} from '.${FILE_PATH}'" >> ${MAIN_JS}
  fi
done

echo "" >> ${MAIN_JS}
echo "/*global exports*/" >> ${MAIN_JS}

for FILE in ${FILES}; do
  CLASS=${FILE##*/}
  CLASS=${CLASS%.js}

  if [ "${CLASS}" != "main" ]; then
    echo "exports.${CLASS} = ${CLASS}" >> ${MAIN_JS}
  fi
done
  

