STAGE=$1
TF_APPLY_ARGS=$2

echo "Applying Terraform for $STAGE"

cd terraform/$STAGE
terraform get
terraform init
terraform apply "${TF_APPLY_ARGS}"
cd ../..
