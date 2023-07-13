source=~/Development/dp2/sigcc-front/dp2-frontend/dist/
# key=~/dp2-kp.pem
key=~/ALPK.pem
# destination=ubuntu@ec2-35-169-124-85.compute-1.amazonaws.com
# destination=ubuntu@ec2-3-87-183-246.compute-1.amazonaws.com
destination=ubuntu@54.159.173.253
echo "Compilando aplicación"
npm run build
echo "Subiendo archivos al servidor"
scp -i $key -r $source $destination:~/
echo "Iniciando despliegue"
ssh -i $key $destination 'bash -s' < deploy_rules.sh